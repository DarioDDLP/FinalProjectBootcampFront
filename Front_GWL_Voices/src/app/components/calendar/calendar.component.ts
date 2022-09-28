import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { CalendarService } from 'src/app/services/calendar.service';
import { UsersServiceService } from 'src/app/services/users-service.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarVisible = true;
  events: any;
  options: any;
  token: any;
  newEvent: any
  user: any;

  constructor(
    private calendarService: CalendarService,
    private usersService: UsersServiceService
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },

      timeZone: 'UTC',
      eventClick: function (info: any) {
        var eventObj = info.event;
        const { title } = eventObj
        const { description } = eventObj._def.extendedProps;
        const { start, end } = eventObj._instance.range
        Swal.fire({
          icon: 'info',
          html: `<h1>${title}</h1>
<h3>${description}</h3><br><hr>
<p>Starts at: ${start}</p>
<p>Ends at: ${end}</p>`
        })
      },
    }
    try {
      const response = await this.calendarService.getAllEvents(this.token);
      this.events = response
    } catch (err) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
    this.user = await this.usersService.getUser(this.token)
  }

  async createNewEvent() {
    await Swal.fire({
      title: 'Create New Event',
      showCloseButton: true,
      html:
        `<div class="d-flex flex-wrap">
        <label for="" class="ms-4">Event start</label>
        <div>
            <input type="date" id="swal-input1" class="swal2-input me-1" value="${new Date()}"><input type="time"
                id="swal-input-hour-start" class="swal2-input ms-0">
        </div>
        <label for="" class="mt-3 ms-4">Event end</label>
        <div>
            <input type="date" id="swal-input2" class="swal2-input me-1" value="${new Date()}">
            <input type="time" id="swal-input-hour-end" class="swal2-input ms-0">
        </div>
        <input type="text" id="swal-input3" class="swal2-input w-75" placeholder="asunto" class="w-100">
        <input type="textarea" id="swal-input4" class="swal2-input w-75" placeholder="descripción" class="w-100">
        </div>`,
      focusConfirm: true,
    })
    const startEvent = document.getElementById('swal-input1') as HTMLInputElement;
    const startHour = document.getElementById('swal-input-hour-start') as HTMLInputElement;
    const endEvent = document.getElementById('swal-input2') as HTMLInputElement;
    const endHour = document.getElementById('swal-input-hour-end') as HTMLInputElement;
    const subject = document.getElementById('swal-input3') as HTMLInputElement;
    const text = document.getElementById('swal-input4') as HTMLInputElement;
    if (startEvent !== null && endEvent !== null && subject !== null && text !== null) {
      if (text.value.trim() === "" || subject.value.trim() === "" || startEvent.value.trim() === "" || endEvent.value.trim() === "" || endEvent.value < startEvent.value || Date.parse(startEvent.value) < Date.parse(new Date().toDateString())) {
        await Swal.fire({
          title: 'Info',
          text: 'Check fields',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      } else {
        const fecha1 = startEvent.value
        const hora1 = startHour.value
        const fechacompleta = fecha1 + ' ' + hora1
        const fecha2 = endEvent.value
        const hora2 = endHour.value
        const fechacompleta2 = fecha2 + ' ' + hora2
        this.newEvent = {
          start: new Date(`${fechacompleta}`),
          end: new Date(`${fechacompleta2}`),
          title: subject.value,
          description: text.value
        }
        try {
          await this.calendarService.createEvent(this.token, this.newEvent);
          const response = await this.calendarService.getAllEvents(this.token);
          this.events = response
          await Swal.fire({
            title: 'Success',
            text: 'Event successfully created',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } catch (err: any) {
          await Swal.fire({
            title: 'Fail',
            text: 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      }
    }
  }

  async deleteEvent(id: any) {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Delete event?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.calendarService.deleteEvent(this.token, id);
            const events = await this.calendarService.getAllEvents(this.token);
            this.events = events
          } catch (err: any) {
            await Swal.fire({
              title: 'Fail',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'Retry'
            });
          }
          Swal.fire('Event deleted!', '', 'success')
        }
      })
    } catch (err) {
      await Swal.fire({
        title: 'Fail',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  }
}
