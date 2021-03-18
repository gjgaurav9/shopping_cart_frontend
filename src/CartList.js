import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Input } from "antd";

const CartList = () => {
  const { Search } = Input;
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((response) => response.json())
      .then((data) => setTableData(data.rows));
  }, []);

  const handleSearch = (text) => {
    console.log("text", text);

    let dataAfterSearch = tableData.filter(
      (data) => data.item_name.includes(text) || data.category.includes(text)
    );
    setTableData(dataAfterSearch);
  };

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_id",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity Available",
      dataIndex: "available_quantity",
    },
  ];

  return (
    <>
      <Search
        placeholder="input search loading default"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={(row) => row.item_id}
      ></Table>
    </>
  );
};

export default CartList;
