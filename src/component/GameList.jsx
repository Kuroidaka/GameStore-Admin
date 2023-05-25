import React from "react";
import styled from "styled-components";
import { mockGameData } from "./mockData";

function getStatusColor(status) {
    switch (status) {
      case "Released":
        return "blue";
      case "In development":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
}

const GameList = () => {
  const StyledStock = styled.span`
    font-weight: bold;
    color: ${props => props.stock < 10 ? "red" : "blue"};
  `;  
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Product Name</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Sales</TableHeader>
          <TableHeader>Earnings</TableHeader>
          <TableHeader>Stock</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {mockGameData.map((game) => (
          <TableRow key={game.id}>
            <TableData>
                <img src={game.imageSrc} alt={game.productName} />
                {game.productName}    
            </TableData>
            <TableData style={{ color: getStatusColor(game.status),fontWeight: "bold" }}>{game.status}</TableData>
            <TableData>{game.price}</TableData>
            <TableData>{game.sales}</TableData>
            <TableData style={{ fontWeight: "bold" }}>{game.earnings}</TableData>
            <TableData>
                <StyledStock stock={game.stock}>{game.stock}</StyledStock>
            </TableData>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default GameList;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-left: 2rem;
  margin-right: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableHeader = styled.th`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333333;
  padding: 1.2rem 1.6rem;
  border-bottom: 3px solid #dddddd;
  text-align: left;
`;

const TableData = styled.td`
    font-size: 1.5rem;
    color: #333333;
    padding: 1.2rem 1.6rem;
    border-bottom: 1px solid #dddddd;

    img {
        width: 4rem;
        height: 4rem;
        margin-right: 1.6rem;
        border-radius: 0.8rem;
      }

`;
