## Sandbox for Zendesk Ticket #1167

> Flashing Cells updates are not handled as quickly and cause the app to freeze

### Initial state 
Branch [`main`](https://github.com/AdaptableTools/support-zendesk-1167-flashing-cells/tree/main) is the exact replica of the provided [CodeSandbox](https://codesandbox.io/p/devbox/fn7qhj)  

Grid size:
 - rows: 2000
 - changes: 400 / 500ms

Versions:
 - Adaptable: 17.0.3 
 - AG Grid: 30.2.1

Performance:
 - updating 400 prices takes  **~15 seconds**!!  
 - JS Heap: up to **2.6 GB**!! (it gets garbage collected after a while)

Root cause:
 - AG Grid requires A LOT of time to upgrade the data model, more time than the change rate of the data itself
 - because of that, the pending flashing cells are not handled as quickly as they should be, resulting in accumulated flashing cells
 - the main thread is blocked and the UI is unresponsive/laggy
 - the memory usage is high because of the accumulated flashing cells 

__All further changes were made in branch [`adaptable_v19`](https://github.com/AdaptableTools/support-zendesk-1167-flashing-cells/tree/adaptable_v19)__

### Step 1: Update to Adaptable v19.0.x and AG Grid v32.1.x

In AdapTable version 18 we have undertaken a significant refactoring of our internal implementation, especially improving how we integrated and synchronized with AG Grid.   
This refactoring was required because AG Grid themselves changed a lot of their internals, especially their **React render engine, improving its performance significantly**.  
Meaning that AG Grid React, and implicitly AdapTable React, should be much faster and more efficient in rendering and updating the UI.

Versions:
- Adaptable: 19.0.5
- AG Grid: 32.1.0

The required upgrades were [minimal](https://github.com/AdaptableTools/support-zendesk-1167-flashing-cells/commit/52436fe2d7626d934e2b67177358fd32e189058e), basically replacing some deprecated APIs.  
**!! Important: no changes were made regarding updating data and/or flashing cells.**

**Performance:**
- updating 400 prices takes between 150ms and 300ms
- JS Heap: no more than 100MB

### Step 2: Replace BadgeColumn with FormatColumn

[Badge Styles](https://docs.adaptabletools.com/guide/handbook-styled-column-badge) are designed to render a colored "badge" with the cells contents, optionally with additional elements like icons or text.  
Technically, a Badge is a AG Grid custom cell renderer which mounts/unmounts a React component.  
**It's not designed to be used in high-frequency updates scenarios** because:
 - creating and destroying React components at such a high rate can get expensive
 - and it is guaranteed to run into render collisions, hence the _"Attempted to synchronously unmount a root while React was already rendering."_ errors

Anyway, in your case you need to style the cells foreground color based on the cell value, and exactly for use cases like this, we implemented the conditional [Format Column](https://docs.adaptabletools.com/guide/handbook-column-formatting-conditions-predicates).  
It is highly performant as it changes only the cell style, without messing with the DOM.

The [changes](https://github.com/AdaptableTools/support-zendesk-1167-flashing-cells/commit/6c7dd02a59a0ad87944961713186de3a81718751) were straightforward.

**Performance:**
- updating 400 prices takes ~ 200ms
- JS Heap: no more than 100MB
- **no more React errors**

### Final state

It is highly recommended to use [async transactions](https://www.ag-grid.com/javascript-data-grid/data-update-high-frequency/) when updating data at such a high rate.  
Technically all the updates are batched and executed once every 50ms (which is the default value, but it can be [configured](https://www.ag-grid.com/javascript-data-grid/grid-options/#reference-clientRowModel-asyncTransactionWaitMillis)).
This way the stress on the AG Grid data model is reduced, and the UI is updated more smoothly.

The required [changes](https://github.com/AdaptableTools/support-zendesk-1167-flashing-cells/commit/0cb0dbe3a376c25ebae54b2c992fe5bef25a065e) are trivial, it's just an additional parameter.

**I also changed the grid size to 20.000 rows.**

Grid size:
- rows: 20.000
- changes: 4000 / 500ms

**Performance:**
- updating 4000 prices takes ~ 150ms
- JS Heap: no more than 210MB







