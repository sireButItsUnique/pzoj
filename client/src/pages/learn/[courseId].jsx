import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const { courseId } = router.query;

    return <p1 className="text-white-0">{courseId + " hasnt been added"}</p1>;
}