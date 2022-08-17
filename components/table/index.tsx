import React, { FC, useEffect, useState } from 'react';

interface TableProps {}

const Table: FC<TableProps> = ({}) => {
  return (
    <div
      style={{
        border: 'solid',
        width: '75%',
        height: '100px',
        margin: 'auto',
        marginTop: '10%',
      }}
    ></div>
  );
};

export default Table;
