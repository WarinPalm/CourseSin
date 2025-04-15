export interface CourseType {
    id: string;
    title: string;
    description: string;
    benefit: string;
    video_file: string;
    thumbnail: string;
    _count:{
        like:number
    }
    Channel: {
        id: string;
        f_name: string;
        l_name: string;
        picture?: string;
    };
    Category: {
        id: string;
        name: string;
    };
    created_at: string;
}

export interface CourseCardProps {
    thumbnail?:string;
    title?:string;
    f_name?:string;
    l_name?:string;
    category_name?:string;
    like?:number
    onPress?: () => void;
}

export interface CourseForm {
    title: string;
    description: string;
    benefit: string;
    video: string;
    category_id: string;
}