export interface Course {
    id: number;
    name: string;
    channel: string;
    category: string;
}

export interface CourseCardProps {
    item: Course;
}