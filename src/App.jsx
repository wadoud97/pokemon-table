import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './Table.css'

function App() {
 const [data, setData] = useState([]);
 const [search,setSearch] = useState('');
 const [powerSearch, setPowerSearch] = useState('');
 const [currentPage, setCurrentPage]= useState(0);
 const [pageSize, setPageSize] = useState(10);
 const itemsPerPage=10;
 useEffect(() => {
  fetch('../public/pokemon.json').then((resp) => resp.json()).then((data) => { 
    //console.log("voiciii",data);
    setData(data) })
 },[]);

 const powerPokemon = (pokemon) => {
  return pokemon.hp+pokemon.attack+pokemon.defense+pokemon.special_attack+pokemon.special_defense; 
}



 const filtredData = data.filter((item) =>{
    const includeNames = item.name.toLowerCase().includes(search.toLowerCase());
    const powerFilter = powerSearch ==='' || powerPokemon(item) >= parseFloat(powerSearch);
    return includeNames && powerFilter;
 }).map((item) =>({
  ...item,
  power:powerPokemon(item)

 }));

//PAGINATION
const pageCount = Math.ceil(filtredData.length/itemsPerPage);
const offset = currentPage * itemsPerPage;
const paginationData = filtredData.slice(currentPage * pageSize, (currentPage + 1 ) * pageSize);

//min && max
const maxPower = Math.max(...paginationData.map((item) => item.power));
const minPower = Math.min(...paginationData.map((item) => item.power));

//PAGINATION HANDLING
const handlePageClick = (selectedPage) => {
  setCurrentPage(selectedPage.selected);
};
// Pagination Size Handle
const handlePageSize= (e) =>{
  const newSize = parseInt(e.target.value);
  setPageSize(newSize);
  setCurrentPage(0);
}
const pageRange = Math.floor(pageSize / 10 );
const marginPage = Math.floor(pageSize /20)
  return (

<div className="p-5">
  <div className="" style={{borderRadius:'8px',backgroundColor:'#f5f5f5'}}>
    <div className="d-flex justify-content-around"> 
    <input type="text" placeholder="Search.." className="form-control m-2" value={search} onChange={(e) => setSearch(e.target.value)} />
     <input type="number"  placeholder="Power threshold" className="form-control m-2" value={powerSearch} onChange={(e) => setPowerSearch(e.target.value)} />
    </div>

     <div className="p-2 m-3">
    < span >Min Power : {maxPower} </span>
      <br /><span>Max Power : {minPower} </span>
     </div>
  </div>
  <div>
  </div>
  <div>
    <table className="table table-striped">
      <thead>
        <tr>
        <th>ID</th>
        <th>name</th>
        <th>type</th>
        <th>health</th>
        <th>attack</th>
        <th>defense</th>
        <th>special_attack</th>
        <th>special_defense</th>
        <th>speed</th>
        <th>power</th>
        </tr>
      </thead>
      <tbody>
        {paginationData.map((item,index) =>(
          <tr key={index}>
            <td> {item.id} </td>
            <td> {item.name} </td>
            <td> {item.type} </td>
            <td> {item.hp} </td>
            <td> {item.attack} </td>
            <td> {item.defense} </td>
            <td> {item.special_attack} </td>
            <td> {item.special_defense} </td>
            <td> {item.speed} </td>
            <td>{item.power} </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="d-flex justify-content-end">
    <ReactPaginate
    pageCount = {pageCount}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    activeClassName={'active'}
    pageRangeDisplayed={pageRange} 
    marginPagesDisplayed={marginPage}
    >
    </ReactPaginate>
  </div>
  <div className="page-size-container">
  <label htmlFor="pageSize" className="page-size-label">Page Size: </label>
  <select
    className="page-size-select"
    name="pageSize"
    value={pageSize}
    onChange={handlePageSize}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
  </select>
</div>
</div>

  );
}
export default App;
