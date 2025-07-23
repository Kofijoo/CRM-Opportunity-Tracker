import { useRegion } from '../../context/RegionContext';
import { Calendar, Clock, Video, Users } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  time: string;
  date: string;
  attendees: number;
  type: 'video' | 'in-person';
  company: string;
}

interface MeetingsData {
  [key: string]: Meeting[];
}

const meetingsData: MeetingsData = {
  Oslo: [
    {
      id: 'meet-1',
      title: 'Product Demo',
      time: '10:00',
      date: '2023-06-15',
      attendees: 3,
      type: 'video',
      company: 'Telenor',
    },
    {
      id: 'meet-2',
      title: 'Contract Review',
      time: '13:30',
      date: '2023-06-15',
      attendees: 4,
      type: 'in-person',
      company: 'DNB Bank',
    },
    {
      id: 'meet-3',
      title: 'Sales Presentation',
      time: '15:00',
      date: '2023-06-16',
      attendees: 6,
      type: 'video',
      company: 'Equinor',
    },
    {
      id: 'meet-4',
      title: 'Follow-up Call',
      time: '11:00',
      date: '2023-06-17',
      attendees: 2,
      type: 'video',
      company: 'Orkla',
    },
  ],
  Bergen: [
    {
      id: 'meet-5',
      title: 'Initial Consultation',
      time: '09:30',
      date: '2023-06-15',
      attendees: 3,
      type: 'video',
      company: 'Grieg Group',
    },
    {
      id: 'meet-6',
      title: 'Proposal Discussion',
      time: '14:00',
      date: '2023-06-16',
      attendees: 4,
      type: 'in-person',
      company: 'BKK',
    },
    {
      id: 'meet-7',
      title: 'Requirements Gathering',
      time: '11:30',
      date: '2023-06-17',
      attendees: 5,
      type: 'video',
      company: 'Lerøy Seafood',
    },
  ],
};

export default function UpcomingMeetings() {
  const { region } = useRegion();
  const meetings = meetingsData[region];
  
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('no-NO', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id}
              className="bg-gray-50 rounded-lg border border-gray-100 p-4 w-64 flex-shrink-0 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{meeting.company}</p>
                </div>
                <div className={`p-2 rounded-full ${meeting.type === 'video' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {meeting.type === 'video' ? (
                    <Video size={16} className="text-blue-600" />
                  ) : (
                    <Users size={16} className="text-green-600" />
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar size={14} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={14} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">{meeting.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users size={14} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">{meeting.attendees} attendees</span>
                </div>
              </div>
              
              <button className="mt-4 w-full py-2 px-3 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Join Meeting
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}