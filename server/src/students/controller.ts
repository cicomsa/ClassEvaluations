import { 
    JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, Delete 
  } from 'routing-controllers'
import Student from './entity'

@JsonController()
export default class StudentController {

    @Get('/students')
    async allStudents() {
        const students = await Student.find()
        return { students }
    } 

    @Get('/students/:id')
    getStudent(
    @Param('id') id: number) {
        return Student.findOne(id)
    }

    @Put('/students/:id')
    async updateStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Cannot find student')

        return Student.merge(student, update).save()
    }

    //@Authorized()
    @Post('/students')
    @HttpCode(201)
    async createStudent(
    
    @Body() student: Student) {   
        const entity = await student.save()
               
        return entity
    }

    
    @Delete('/students/:id')
    async deleteStudent(
    @Param('id') id: number) {
        const student = await Student.findOne(id)
        if (!student) throw new NotFoundError('Cannot find student')
        
        return Student.remove(student)
    }
    
}