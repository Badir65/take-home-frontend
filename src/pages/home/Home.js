import React from "react"
import "./style.css"
import News from "../news/News"

const Homes = () => {
  return (
    <>
      <main>
        <div className='container'>
          <section className='mainContent'>
            <News />
          </section>
        </div>
      </main>
    </>
  )
}

export default Homes;
