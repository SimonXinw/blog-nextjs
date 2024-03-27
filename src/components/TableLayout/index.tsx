import React from 'react';
import Body from './TableBody';
import Header from './TableHeader';

function TableLayout(props: any) {
  return <div>{props.children}</div>;
}

export default TableLayout;

TableLayout.Header = Header;

TableLayout.Body = Body;

export { Header, Body };
