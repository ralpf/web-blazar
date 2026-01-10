// this is a build-step script
// it scans the project for .ts files, takes all classes and
// checks if they are based on Unit class
// for all this classes, a cantrilized map is build that lets us to map
// string -> Unit TS class, so the DOM 'walker' can make new instances
// of coresponding types found on HTML elements with 'data-type' attrib
// note: abstract classes can be excluded from the map

import ts from "typescript";
import path from "node:path";
import fs from "node:fs";



const projectRoot = process.cwd();
const tsconfigPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, "tsconfig.json");
if (!tsconfigPath) {
    throw new Error("tsconfig.json not found");
}

const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
);

const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options
});

const checker = program.getTypeChecker();

const unitSource = program.getSourceFile(path.join(projectRoot, "unitlib/core/Unit.ts"));
if (!unitSource) {
    throw new Error("unitlib/core/Unit.ts not found");
}

let unitSymbol = null;
ts.forEachChild(unitSource, node => {
    if (ts.isClassDeclaration(node) && node.name?.text === "Unit") {
        unitSymbol = checker.getSymbolAtLocation(node.name);
    }
});
if (!unitSymbol) {
    throw new Error("Unit symbol not found");
}

function extendsUnit(classDecl) {
    if (!classDecl.heritageClauses) return false;
    const baseTypes = checker.getTypeAtLocation(classDecl).getBaseTypes() || [];
    const stack = [...baseTypes];
    while (stack.length > 0) {
        const t = stack.pop();
        const sym = t.getSymbol();
        if (sym === unitSymbol) return true;
        const parents = t.getBaseTypes() || [];
        for (const p of parents) {
            stack.push(p);
        }
    }
    return false;
}

const entries = [];
for (const sf of program.getSourceFiles()) {
    if (sf.isDeclarationFile) continue;
    const filePath = sf.fileName;
    if (!filePath.includes(path.join(projectRoot, "src")) &&
        !filePath.includes(path.join(projectRoot, "unitlib"))) {
        continue;
    }
    ts.forEachChild(sf, node => {
        if (!ts.isClassDeclaration(node) || !node.name) return;
        const symbol = checker.getSymbolAtLocation(node.name);
        if (!symbol) return;
        const isExported = symbol.getDeclarations()?.some(d =>
            ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Export
        );
        if (!isExported) return;
        if (!extendsUnit(node)) return;

        const className = node.name.text;
        entries.push({ className, filePath });
    });
}

const outPath = path.join(projectRoot, "unitlib/core/unitRegistry.gen.ts");
const relImports = new Map();

for (const e of entries) {
    const rel = path.relative(path.dirname(outPath), e.filePath)
        .replace(/\\/g, "/")
        .replace(/\.ts$/, "");
    relImports.set(e.className, rel);
}

let out = "";
for (const [name, rel] of relImports) {
    out += `import { ${name} } from "${rel.startsWith(".") ? rel : "./" + rel}";\n`;
}
out += "\nexport const unitRegistry = {\n";
for (const [name] of relImports) {
    out += `    ${name},\n`;
}
out += "};\n";

fs.writeFileSync(outPath, out, "utf8");
console.log(`Wrote ${outPath} (${entries.length} classes)`);
