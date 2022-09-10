export function RepoList({ children }) {
    return <ul className="list-group">{children}</ul>;
}

// UserListItem renders a bootstrap list item containing data from the recipe api call
export function RepoListItem({
    title,
    description,
    onClick
})  {
    return (
        <li className="list-group-item">
            <div className="row text-left">
               <div className="col-xs-12">
                  <button className="btn btn-outline-bd-primary repo-button" value={title} onClick={onClick}>{title}</button>
                </div>
            </div>
            <div className="row text-left">
                <div className="col-xs-12">
                
                    <strong>Description:</strong>
                   
                        <p>{description}</p>
                       
                </div>
            </div>
        </li>
    );
}
