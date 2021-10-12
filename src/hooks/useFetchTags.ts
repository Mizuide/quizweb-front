import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import api from "../property/api.json";
import tag from "../type/tag";

type returnTagsInfo = {
    count: number,
    tags: tag[]
}

function fetchTags(): Promise<AxiosResponse<returnTagsInfo>> {
    return axios.get<returnTagsInfo>(api.tags.url);
}

const useFetchTags: () => [returnTagsInfo, () => void] = () => {
    const [tags, setTags] = useState<returnTagsInfo>({ tags: [], count: 0 });

    const setFetchTags = function () {
        fetchTags().then(res => setTags(res.data));
    }

    return [tags, setFetchTags];
}

export default useFetchTags;