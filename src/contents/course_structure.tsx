import Lesson1_Introduction_to_Data_Sharding from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/1_Introduction_to_Data_Sharding";
import Lesson2_Sharding_Techniques from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/2_Sharding_Techniques";


export const courseStructure = {
  "courses": [
    {
      "id": 1,
      "name": "System Design",
      "chapters": [
        {
          "id": 1,
          "name": "Data Intensive Applications",
          "lessons": [
            {
              "id": 1,
              "name": "Data Sharding",
              "pages": [
                {
                  "id": 1,
                  "name": "Introduction to Data Sharding",
                  "path": "courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/1_Introduction_to_Data_Sharding",
                  "component": Lesson1_Introduction_to_Data_Sharding
                },
                {
                  "id": 2,
                  "name": "Sharding Techniques",
                  "path": "courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/2_Sharding_Techniques",
                  "component": Lesson2_Sharding_Techniques
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
