import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import api from "../property/api.json";
import tag from "../type/tag";

type returnTagsInfo = {
    count: number,
    tags: tag[]
}

function fetchTags(query: string): Promise<AxiosResponse<returnTagsInfo>> {
    return axios.get<returnTagsInfo>(api.tags.url, { params: query });
}

const useFetchTags: () => [returnTagsInfo, (query: string) => void] = () => {
    const [tags, setTags] = useState<returnTagsInfo>({ tags: [], count: 0 });

    const setFetchTags = function (query: string) {
        fetchTags(query).then(res => setTags(res.data));
    }

    return [tags, setFetchTags];
}

export default useFetchTags;