import { useQuery } from "@tanstack/react-query";
import { api_url } from "@/lib/config";
import { useFetchClient } from "@/lib/fetch-client";
import { BaseCourse, LecturedCourse } from "@/types/course";

interface PersonalCoursesResponse {
  presentedCourses: BaseCourse[];
  enrolledCourses: LecturedCourse[];
  departmentCourses: LecturedCourse[];
}

export function useGetPersonalCourses() {
  const { fetchClient, isAuthenticated } = useFetchClient();

  const getPersonalCourses = async (): Promise<PersonalCoursesResponse> => {
    try {
      const response = await fetchClient<{ data: PersonalCoursesResponse }>(
        `${api_url}/personal/courses`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch personal courses:", error);
      throw new Error("Failed to load courses");
    }
  };

  return useQuery({
    queryKey: ["personal", "courses"],
    queryFn: getPersonalCourses,
    enabled: isAuthenticated,
  });
}
