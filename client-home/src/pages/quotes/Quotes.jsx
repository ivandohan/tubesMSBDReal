import "./quotes.scss"

const Quotes = () => {
    return (
        <div className="quotes">
            <h1>New Quotes</h1>
            <div className="vm">
                <h2>Add New</h2>
                <div className="inputSection">
                    <input type="text" placeholder="Description" name="descr"/>
                </div>
            </div>
        </div>
    )
}

export default Quotes