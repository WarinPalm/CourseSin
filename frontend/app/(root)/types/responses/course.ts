export interface CourseResponse {
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
    like:number
    onPress?: () => void;
}

export interface ViewCourseResponse {
    id:string;
    title:string;
    description:string;
    benefit:string;
    video_file:string;
    thumbnail:string;
    created_at:string;
    _count:{
        like:number;
    }
    Category:{
        id:string;
        name:string
    }
}