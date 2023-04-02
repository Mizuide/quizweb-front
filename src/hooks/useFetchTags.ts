import { useState } from "react";
import * as api from "../const/api";
import tag from "../type/tag";


const useFetchTags: () => [tag[], (query?: string) => void] = () => {
    const [tags, setTags] = useState<tag[]>([]);

    const fetchTags = function (query?: string) {
        api.getTagList({ prefix: query || '' }).then(res => setTags(res.data.tagList));
    }

    return [tags, fetchTags];
}

export default useFetchTags;