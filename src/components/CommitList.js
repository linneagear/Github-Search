export function CommitList({ children }) {
    return <ul className="">{children}</ul>;
}

// UserListItem renders a bootstrap list item containing data from the recipe api call
export function CommitListItem({
    message
}) 
{

    return (
        <li className="list-group-item">
           
            <div className="row text-left">
                <div className="col-xs-12">
                <strong>Commit Message:</strong>
                         <p>{message}</p>
                         {/* <p>{date}</p> */}
                 
                </div>
            </div>
        </li>
    );
}
