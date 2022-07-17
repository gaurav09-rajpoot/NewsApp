import React  from 'react'

const Newitems =(props)=> {
  
    let { title, description, imageurl, newsUrl, author, date, source } = props;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end,position', position: 'absolute', right: '0' }}>
            <span className=' badge rounded-pill bg-danger' >{source}</span>

          </div>
          <img src={!imageurl ? "https://technode.com/wp-content/uploads/2022/07/Xiaomi-12S-Ultra-Green-3.jpg" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>

    )
  
}

export default Newitems