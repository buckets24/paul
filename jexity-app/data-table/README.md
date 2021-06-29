# DataTable how-tos

## Rendering

DataTable relies on a parent div to have a respectable percentage/fixed height. What I mean is that if you put a child inside said div, giving that child a `height="100%"` or `width="100%"` should work. I recommend trying this out with a simple div + bgcolor before trying to render the `<DataTable>` component. Once you have this parent div that works you adding `<DataTable>` will work, this is necessary to have a dynamic height DataTable.

The DataTable supports infinite scroll. Infinite scroll requires a defined `px` value for `height`. How we acheive this is that internally the component measures itself and uses the `px` values as the height for the `FixedSizeList` which is from `react-window`.

---

## Technologies/Libraries used

- react-table
- react-window
- react-window-infinite-loader
- jexity-app/measured-box
- @chakra-ui/react
