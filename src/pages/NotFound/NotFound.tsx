import "./NotFound.less"
const NotFound = () => {
    const goBack = ()=>{
        history.go(-1);
    }
  return (
    <div className="notFound">
        <div className="notFound-main">
            <h1>404</h1>
            <div className="notFound-item">
                <span>NOT FOUND</span>
                <p>您要前往的页面不见了~</p>
                <i onClick={goBack}>返回上一页</i>
            </div>
        </div>
    </div>
  )
}
export default NotFound