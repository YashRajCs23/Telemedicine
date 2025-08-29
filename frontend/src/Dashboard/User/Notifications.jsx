import { CheckCircle, AlertTriangle, Info, Clock, Trash2, Check } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { 
      id: 1, 
      message: "Your appointment with Dr. Anjali Sharma is confirmed for tomorrow at 10:00 AM", 
      time: "2 hours ago", 
      type: "success",
      read: false
    },
    { 
      id: 2, 
      message: "Dr. Raj Mehta has rescheduled your appointment to September 6th at 3:00 PM", 
      time: "1 day ago", 
      type: "warning",
      read: false
    },
    { 
      id: 3, 
      message: "Your prescription has been updated. Please check the new medication details", 
      time: "2 days ago", 
      type: "info",
      read: true
    },
    { 
      id: 4, 
      message: "Reminder: Take your morning medication (Aspirin 75mg)", 
      time: "3 days ago", 
      type: "reminder",
      read: true
    },
    { 
      id: 5, 
      message: "New health article available: 10 Tips for Better Heart Health", 
      time: "5 days ago", 
      type: "info",
      read: true
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'reminder':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getNotificationStyle = (type, read) => {
    const baseStyle = "p-4 rounded-lg border transition-all duration-200 hover:shadow-md";
    if (!read) {
      switch (type) {
        case 'success':
          return `${baseStyle} bg-green-50 border-green-200`;
        case 'warning':
          return `${baseStyle} bg-yellow-50 border-yellow-200`;
        case 'reminder':
          return `${baseStyle} bg-blue-50 border-blue-200`;
        default:
          return `${baseStyle} bg-blue-50 border-blue-200`;
      }
    }
    return `${baseStyle} bg-white border-gray-200`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Check size={16} />
            <span>Mark All Read</span>
          </button>
          <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Clear All
          </button>
        </div>
      </div>

      {/* Notification Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
          All ({notifications.length})
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">
          Unread ({unreadCount})
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">
          Appointments
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">
          Reminders
        </button>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={getNotificationStyle(notification.type, notification.read)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.read && (
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Check size={16} />
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up! New notifications will appear here.</p>
        </div>
      )}

      {/* Load More Button */}
      {notifications.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Load Older Notifications
          </button>
        </div>
      )}
    </div>
  );
}