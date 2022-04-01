import React, { useState } from "react";
import { css } from "emotion";
import Accordion from "@hig/accordion";
import Table from "@hig/table";

import { TABLE_OBJECT_BASIC } from "../fixtures/TableObjectBasic";
import SortColumns from "../fixtures/SortColumns";

const customStylesheet = (styles, props, themeData, themeMeta) => {
  return {
    ...styles,
    higTableHeader: {
      ...styles.higTableHeaderWrapper,
      display: "none"
    }
  }
}

const TABLE_DATA_1 = {
  meta: {
    sortColumns: props => <SortColumns passedData={props} />,
    stickyItems: {
      isStickyHeader: true,
      isStickyColumns: true,
    },
  },
  columns: [...TABLE_OBJECT_BASIC.columns],
  data: [...TABLE_OBJECT_BASIC.data]
};
const TABLE_DATA_2 = {
  meta: {
    sortColumns: props => <SortColumns passedData={props} />,
    stickyItems: {
      isStickyHeader: true,
      isStickyColumns: true,
    },
  },
  columns: [...TABLE_OBJECT_BASIC.columns],
  data: [...TABLE_OBJECT_BASIC.data]
};

export default function SandboxPage() {
  const [getTableRef1, setTableRef1] = useState(null);
  const [getTableRef2, setTableRef2] = useState(null);
  const setTableRef1Function = element => setTableRef1(element);
  const setTableRef2Function = element => setTableRef2(element);

  return (
    <div className={css({background: "#fff"})}>
      <Accordion defaultCollapsed={false} label="Table 1">
        <Table
          id="table-1"
          onBlur={(event, internalMethods) => {
            internalMethods.setActiveRowIndex(null);
            internalMethods.setActiveColumnIndex(null);
            getTableRef2.focus();
          }}
          onFocus={(event, internalMethods) => {
            internalMethods.setActiveRowIndex(29);
            internalMethods.setActiveColumnIndex(0);
          }}
          onKeyDown={(event, internalMethods) => {
            if (event.keyCode === 40) {
              if (internalMethods.getActiveRowIndex + 1 === TABLE_DATA_1.data.length) {
                getTableRef1.blur();
              }
            }
          }}
          stylesheet={customStylesheet}
          tableObject={TABLE_DATA_1}
          tableRef={setTableRef1Function}
          tableSpreadProps={{tabIndex: -1}}
          paginateDynamic={true}
        />
      </Accordion>
      <Accordion defaultCollapsed={false} label="Table 2">
        <Table
          id="blah-blah-blah"
          onBlur={(event, internalMethods) => {
            internalMethods.setActiveRowIndex(null);
            internalMethods.setActiveColumnIndex(null);
            getTableRef1.focus();
          }}
          onFocus={(event, internalMethods) => {
            internalMethods.setActiveRowIndex(0);
            internalMethods.setActiveColumnIndex(0);
          }}
          onKeyDown={(event, internalMethods) => {
            if (event.keyCode === 38) {
              if (internalMethods.getActiveRowIndex -1 === 0) {
                getTableRef2.blur();
              }
            }
          }}
          stylesheet={customStylesheet}
          tableObject={TABLE_DATA_2}
          tableRef={setTableRef2Function}
          tableSpreadProps={{tabIndex: -1}}
          paginateDynamic={true}
        />
      </Accordion>
    </div>
  );
}


/* 
const itemEls = useRef({})
{items.map((item, index)) => (
 <p key={item} ref={(element) => itemEls.current[index] = element}>{item}</p>
)) */