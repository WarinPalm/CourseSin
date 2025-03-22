export interface Course {
    id: string;
    name: string;
    channel: string;
    category: string;
}

export interface CourseCardProps {
    item: Course;
    onPress?:()=>void;
}