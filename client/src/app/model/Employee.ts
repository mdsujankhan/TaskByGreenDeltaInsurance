
export class Employee {
    public employee_name: string;
    public employee_salary: number;
    public employee_age: number;
    public profile_image: string;

    constructor(
        employee_name: string,
        employee_salary: number,
        employee_age: number,
        profile_image: string
    ) {
        this.employee_name = employee_name;
        this.employee_salary = employee_salary;
        this.employee_age = employee_age;
        this.profile_image = profile_image;
    }
}