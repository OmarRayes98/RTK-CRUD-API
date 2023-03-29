import { memo } from "react";

import {
    Table
  } from "react-bootstrap";

import PostListItems from "./PostListItems";


const PostList = ({deleteRecord}) => {

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th style={{ width: "70%" }}>Title</th>
        <th style={{ width: "10%" }}></th>
      </tr>
    </thead>
    <tbody>

      <PostListItems deleteRecord={deleteRecord} />

    </tbody>
  </Table>
  )
}

export default memo(PostList);
