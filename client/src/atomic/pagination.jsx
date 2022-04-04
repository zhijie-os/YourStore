function Pagination(props){
    return(
        <div className="container d-flex justify-content-center">
        <nav className="navbar">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={()=>props.onClick(props.pageNumber-1)}>Previous</a></li>
                <li className="page-item"><a className="page-link" >{props.pageNumber+1}</a></li>
                <li className="page-item"><a className="page-link" onClick={()=>props.onClick(props.pageNumber+1)}>{props.pageNumber+2}</a></li>
                <li className="page-item"><a className="page-link" onClick={()=>props.onClick(props.pageNumber+2)}>{props.pageNumber+3}</a></li>
                <li className="page-item"><a className="page-link" onClick={()=>props.onClick(props.pageNumber+1)}>Next</a></li>
            </ul>
        </nav>
        </div>
    )
}

export default Pagination;