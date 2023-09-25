import Navbar from "../components/Navbar";
import Product from "../components/Product";

function Products(props) {
 
  return (
    <div>
      <Navbar brands={props.brands} cates={props.cates}/>
      #Products
      <div class="container">
        <div class="mt-3">
          <h2 class="text-center" id="groupPrd">
            Group Products
          </h2>
          <hr />

          <div class="row mt-3" id="resultPrd">
            <div className="col-md-3">
              <Product name="Iphone X" price="18tr" />
            </div>
            <div className="col-md-3">
              <Product name="Iphone 11" price="20tr" />
            </div>
            <div className="col-md-3">
              <Product name="Iphone 14" price="27tr" />
            </div>
            <div className="col-md-3">
              <Product name="Iphone 13" price="25tr" />
            </div>
          </div>

          <div class="row w-10 mt-3 mr-auto">
            <div class="col-md">
              <button
                class="btn btn-outline-success w-25 d-flex"
                id="showmoreBtn"
              >
                Show more..
              </button>
            </div>

            <div class="col-md" id="pageNumber"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
