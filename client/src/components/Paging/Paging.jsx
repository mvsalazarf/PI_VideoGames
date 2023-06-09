import React from 'react';
import style from './Paging.module.css';

export default function Paging({ vgPerPage, allVg, currentPage, actualPage }) {
  const pageNumbers = [];
  const maxPage = Math.ceil(allVg / vgPerPage);

  for (let i = 0; i < maxPage; i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <nav>

        {
          pageNumbers && pageNumbers.map((num) => {
            return (

              <button style={{ margin: 6 }} onClick={() => actualPage(num)}>{num}</button>

            )
          })
        }
        <p>{`Actual page ${currentPage}`}</p>

      </nav>
    </div>
  )

}