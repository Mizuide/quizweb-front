import axios from "./axios";
import { AxiosResponse } from "axios";
import { useState } from "react";
import api from "../property/api.json";
import tag from "../type/tag";

function fetch(query?: string): Promise<AxiosResponse<tag[]>> {
    return axios.get<tag[]>(api.tag.url, { params: { prefix: query } });
}

const useFetchTags: () => [tag[], (query?: string) => void] = () => {
    // const [tags, setTags] = useState<returnTagsInfo>({ tags: [], count: 0 });
    const [tags, setTags] = useState<tag[]>([]);

    const fetchTags = function (query?: string) {
        fetch(query).then(res => setTags(res.data));
    }

    return [tags, fetchTags];
}

export default useFetchTags;