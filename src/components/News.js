import React, { useEffect, useState } from 'react'

import Newitems from './Newitems';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalresults, settotalresults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d6d6fc6e20946a2b846c130d664100b&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setarticles(parseData.articles)
        settotalresults(parseData.totalResults)
        setloading(false)

        props.setProgress(100);


    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}-The Guardian`
        updateNews();
        //   eslint-disable-next-line

    }, [])



    //    const handlePrevClick = async () => {

    //         setpage(page-1)

    //         updateNews()
    //     }
    //     const handleNextClick = async () => {

    //         setpage(page+1)
    //         updateNews()
    //     }
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d6d6fc6e20946a2b846c130d664100b&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        setarticles(articles.concat(parseData.articles))
        settotalresults(parseData.totalResults,)


    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '15px 0px', marginTop: '90px' }}>The Guardian - Top {capitalizeFirstLetter(props.category)} Headlines  </h1>
            {loading && <Spinner />}
            {/* Infinite scroll */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalresults}
                loader={<Spinner />}
            >
                <hr />


                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>

        // {/* Next and previous button */ }


        // {/* <div className="container d-flex justify-content-between">
        //             <button disabled=page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr;
        //                 Previous</button>
        //             <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        //         </div> */}



    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News