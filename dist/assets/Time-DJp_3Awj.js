const e=class _Time{static update(){const e=performance.now();this.dt=e-this._msPrev/1e3,this.now=e/1e3,this._msPrev=e}};e._msPrev=performance.now(),e.dt=0,e.now=0;let t=e;export{t as Time};
