import "./reportedpost.scss"
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const ReportedPost = () => {
    const { isLoading, error, data } = useQuery(["rposts"], () =>
        makeRequest.get("/posts/reported-posts").then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
                queryClient.invalidateQueries(["rposts"]);
            },
        }
    );

    const handleDelete = (id) => {
        if(window.confirm("Are you sure about that?")) deleteMutation.mutate(id);
    };

    return (
        <div className="manageorder">
            <h1>Reported Posts</h1>
            {
                error ? "Something went wrong" : isLoading ? "loading..." :
                (data.length == 0 &&
                <div className="order-detail">
                    <p>No reported post yet.</p>
                </div>)
            }
            {
                error ? "Something went wrong" : isLoading ? "loading..." :
                data.map((post) => (
                    <div className="order-detail">
                        <div className="info">
                            <h3>{post.name}</h3> | Reported by :
                            <span>{post.numOfReporter} peoples</span>
                        </div>
                        <div className="detail-info">
                            <p>{post.descr}</p>
                        </div>
                        <div className="detail-info">
                            <img src={"/upload/" + post.img} alt="" />
                        </div>
                        <button onClick={() => handleDelete(post.id)}>Delete {post.id}</button>
                    </div>
                ))
            }
        </div>
    )
}

export default ReportedPost