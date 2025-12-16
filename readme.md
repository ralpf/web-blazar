# Blazar
### A project build around esp32 microcontroller supported by a web ui frontend
This is the website part of the project.
Good luck to it

# Architecture
The DOM is used as a hierarchical graph to which we attach units (think of them as Unity components)
Globally there are 2 kind of components we do attach
    global units, add 'data-roottype=MyClass' to the dom item
    inner units, add 'data-type=MyClass' to the dom item

global units should be specified when calling the initialize
inner units will be auto-resolve during initialize

# Notes
all classes that terminates as *Unit.ts are abstract classes, except Unit.ts

refactor: perhaps we can strip off data-roottype attr. To do this, we inherit Application from Unit, and assume that on most top dom element the derived class will be attached (i.e. BlazarApp that extends Application). The inner units will be auto-resolved and added as fields to BlazarApp intance


- Views
  - view:form (LampView)
    - header
    - slider
    - form (Flicker)
    - collection
      - form (mood buttons)
      - form (hsv sliders)
      - form (color picker)


# Monotonic Input Update Protocol
Each InputUnit attaches a monotonic uint16 sequence number to every GET request.  
Sequence numbers wrap naturally.  
ESP32 stores the last accepted sequence per input.  
An update is applied only if it is newer than the stored one.  
Older or delayed requests are ignored.  
Wrap-safe comparison:  
```c++
newer(seq, last) ⇔ (int16)(seq - last) > 0
```
This implements monotonic state overwrite:
only newer intent may update state; older intent can never revert it.