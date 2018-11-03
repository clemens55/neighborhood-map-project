import React from 'react'

function Sidebar(props){
  let listItems = props.filteredLocations.map((item, index) => {
      return (
        <li
          role="link"
          onClick={e => props.onLinkClick(item.name)}
          key={index}
          tabIndex={props.tabIndex}
          >
          {item.name}
        </li>
      )
    })
  return(
    <div id="sidebar">
      <h2 id="sidebar-title">Coffee Shops</h2>
      <h3><i>in Vienna</i></h3>
      <input
        type="text"
        id="sidebar-search"
        placeholder="Filter locations..."
        value={props.query}
        onChange={e => props.onChange(e.target.value)}
      />
      <ul id="sidebar-list">
        {listItems.length ? listItems : <p>No coffe shops available</p>}
      </ul>
    </div>
  )
}

export default Sidebar
