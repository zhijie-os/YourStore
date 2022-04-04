function Pagination(props){
    return(
        <div class="container d-flex justify-content-center">
        <nav class="navbar">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">{props.currentPage}</a></li>
                <li class="page-item"><a class="page-link" href="#">{props.currentPage+1}</a></li>
                <li class="page-item"><a class="page-link" href="#">{props.currentPage+2}</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
        </div>
    )
}

export default Pagination;