import React from 'react';
import style from './Paging.module.css';

export default function Paging({ vgPerPage, allVg, currentPage, actualPage }) {
  const pageNumbers = [];
  const maxPage = Math.ceil(allVg / vgPerPage);

  for (let i = 0; i < maxPage; i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <div>
      <nav>
        <ul>
          {
            pageNumbers && pageNumbers.map((num) => {
              return (
                <li key={num}>
                  <button onClick={() => actualPage(num)}>{num}</button>
                </li>
              )
            })
          }
          <span>{`Actual page ${currentPage}`}</span>
        </ul>
      </nav>
    </div>
  )

}