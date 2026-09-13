# Project overview

This project provides a framework for building websites that control and reflect the internal state of ESP32 boards. The board framework is written in C++.

## Board state and application loop

The board's backend changes state used by its application. The application runs in a loop, performing mathematical operations using the current parameters and settings, including coefficients.

Changes take effect as the loop uses the updated state. There is no separate, explicit apply step.

## Website and board communication

On startup, the website obtains the board's current state and sets its inputs to reflect that state. Users can then alter the inputs, triggering GET requests to API endpoints and WebSocket writes that serve as an event log.

Initializing inputs from board state and handling user edits are distinct parts of this flow.

## HTML adornments and Units

HTML elements, particularly input controls, are adorned with additional tags or metadata that connect them to framework behavior.

When the website launches, the framework traverses the DOM once to build a hierarchy of active service instances called Units. This forms the graph of active framework objects maintained by the website.

A Unit wraps an HTML element and is the base class from which almost all framework types inherit. Units resemble Unity Components in purpose, but are much simpler: they attach behavior to elements and participate in the framework's hierarchy.

The HTML describes where behavior belongs; the Unit instances provide that behavior and connect the interface to board state and communication.

## Details to define during implementation

The exact HTML adornment syntax, Unit lifecycle, API endpoint format, state payloads, and WebSocket event format are not yet specified in this overview.
