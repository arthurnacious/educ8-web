import { useQuery } from "@tanstack/react-query";
import { Department } from "../interface";

interface DepartmentWithCounts extends Department {
  lecturersCount: number;
  leadersCount: number;
  coursesCount: number;
}

export function useGetAllDepartments() {
  // Fetch data from your API here.
  const data = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      slug: "computer-science",
      name: "Computer Science",
      leaderName: "Dr. Alice Johnson",
      leadersCount: 320,
      lecturersCount: 25,
      coursesCount: 15,
      isActive: true,
    },
    {
      id: "6a1d8f62-4c8b-4f7c-9ad5-776b4cf69a7f",
      slug: "electrical-engineering",
      name: "Electrical Engineering",
      leaderName: "Dr. Robert Smith",
      leadersCount: 280,
      lecturersCount: 22,
      coursesCount: 12,
      isActive: true,
    },
    {
      id: "81f2c1c6-0c5c-46bb-9e9f-67b339316d8e",
      slug: "mechanical-engineering",
      name: "Mechanical Engineering",
      leaderName: "Prof. Sarah Williams",
      leadersCount: 250,
      lecturersCount: 18,
      coursesCount: 10,
      isActive: true,
    },
    {
      id: "3b8f2b52-227f-4c1a-bd79-c6d4b69c4900",
      slug: "civil-engineering",
      name: "Civil Engineering",
      leaderName: "Dr. John Doe",
      leadersCount: 210,
      lecturersCount: 20,
      coursesCount: 10,
      isActive: true,
    },
    {
      id: "15d9be38-baa5-4c57-b6d5-18f1a6891e40",
      slug: "business-administration",
      name: "Business Administration",
      leaderName: "Dr. Emily Carter",
      leadersCount: 400,
      lecturersCount: 30,
      coursesCount: 20,
      isActive: true,
    },
    {
      id: "d3147f9a-8b38-4c2c-8e63-9b4b0b11a47d",
      slug: "psychology",
      name: "Psychology",
      leaderName: "Dr. Brian Wilson",
      leadersCount: 200,
      lecturersCount: 15,
      coursesCount: 8,
      isActive: true,
    },
    {
      id: "4f4b89d6-d929-41ea-a5b6-1c2f2d614fb1",
      slug: "biochemistry",
      name: "Biochemistry",
      leaderName: "Dr. Lisa Green",
      leadersCount: 180,
      lecturersCount: 12,
      coursesCount: 7,
      isActive: true,
    },
    {
      id: "a6185c75-bd76-4945-bef8-2e62e3cc93b4",
      slug: "physics",
      name: "Physics",
      leaderName: "Dr. Mark Anderson",
      leadersCount: 230,
      lecturersCount: 17,
      coursesCount: 9,
      isActive: true,
    },
    {
      id: "09d5c5e7-6e6a-4c0d-bc9d-829c89046b98",
      slug: "mathematics",
      name: "Mathematics",
      leaderName: "Dr. Rachel Scott",
      leadersCount: 190,
      lecturersCount: 14,
      coursesCount: 10,
      isActive: true,
    },
    {
      id: "1ebf9978-49e7-4c73-987a-8e5b4fdf2f2b",
      slug: "chemistry",
      name: "Chemistry",
      leaderName: "Dr. Kevin White",
      leadersCount: 175,
      lecturersCount: 11,
      coursesCount: 7,
      isActive: true,
    },
    {
      id: "c6e2e1e3-80b5-4737-a19c-c8cb5fd9f446",
      slug: "philosophy",
      name: "Philosophy",
      leaderName: "Dr. David Clark",
      leadersCount: 140,
      lecturersCount: 10,
      coursesCount: 6,
      isActive: true,
    },
    {
      id: "98cb6f21-b492-445b-9b13-438e00345b2c",
      slug: "economics",
      name: "Economics",
      leaderName: "Dr. Olivia Parker",
      leadersCount: 260,
      lecturersCount: 16,
      coursesCount: 10,
      isActive: true,
    },
    {
      id: "6f1a7c88-3a1f-4a88-a3c2-bb3d545be73e",
      slug: "sociology",
      name: "Sociology",
      leaderName: "Dr. Daniel Evans",
      leadersCount: 180,
      lecturersCount: 12,
      coursesCount: 8,
      isActive: true,
    },
    {
      id: "ca58ed7e-291b-482b-90db-935eb801a7f2",
      slug: "history",
      name: "History",
      leaderName: "Dr. Hannah Lewis",
      leadersCount: 160,
      lecturersCount: 11,
      coursesCount: 7,
      isActive: true,
    },
    {
      id: "64bb48f4-491c-4a2a-a775-187fbb3b5fd3",
      slug: "geography",
      name: "Geography",
      leaderName: "Dr. Jack Thomas",
      leadersCount: 170,
      lecturersCount: 10,
      coursesCount: 7,
      isActive: true,
    },
    {
      id: "feb940d8-f5fc-4d4c-92f6-b72d63a59159",
      slug: "political-science",
      name: "Political Science",
      leaderName: "Dr. Sophia Baker",
      leadersCount: 150,
      lecturersCount: 9,
      coursesCount: 6,
      isActive: true,
    },
    {
      id: "9d47b4c6-25c8-4d0f-87b2-33fba7a3a626",
      slug: "law",
      name: "Law",
      leaderName: "Dr. Benjamin Harris",
      leadersCount: 280,
      lecturersCount: 20,
      coursesCount: 12,
      isActive: true,
    },
    {
      id: "e6fa3515-2b61-4a7c-b4eb-07a2a2b97380",
      slug: "medicine",
      name: "Medicine",
      leaderName: "Dr. Victoria Adams",
      leadersCount: 350,
      lecturersCount: 28,
      coursesCount: 18,
      isActive: true,
    },
    {
      id: "6a2b5c64-459d-4c9c-96a1-b62bdbdcfcd1",
      slug: "nursing",
      name: "Nursing",
      leaderName: "Dr. Patrick Green",
      leadersCount: 300,
      lecturersCount: 22,
      coursesCount: 14,
      isActive: true,
    },
    {
      id: "ea4e629d-8ad4-4b9b-9d8a-c4d8f4d88c93",
      slug: "public-health",
      name: "Public Health",
      leaderName: "Dr. Margaret Turner",
      leadersCount: 220,
      lecturersCount: 18,
      coursesCount: 10,
      isActive: true,
    },
  ];

  return useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  async function getAllDepartments(): Promise<DepartmentWithCounts[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
}
