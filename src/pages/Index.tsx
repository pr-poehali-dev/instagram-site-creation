import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

export default function Index() {
  const [activeTab, setActiveTab] = useState('home')
  const [timeRemaining, setTimeRemaining] = useState(23 * 60 + 45)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
  }

  const stories = [
    { id: 1, name: 'Ваша история', image: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg', isOwn: true },
    { id: 2, name: 'alex_photo', image: '/img/cb3ffae2-40be-4509-bc43-22b602d239fa.jpg', viewed: false },
    { id: 3, name: 'maria_travel', image: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg', viewed: true },
    { id: 4, name: 'design_daily', image: '/img/cb3ffae2-40be-4509-bc43-22b602d239fa.jpg', viewed: false },
  ]

  const posts = [
    {
      id: 1,
      user: { name: 'alex_photo', avatar: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg' },
      image: '/img/cb3ffae2-40be-4509-bc43-22b602d239fa.jpg',
      likes: 142,
      caption: 'Прекрасный день для фотосессии! 📸 #photography #lifestyle',
      timeAgo: '2 часа назад'
    },
    {
      id: 2,
      user: { name: 'maria_travel', avatar: '/img/cb3ffae2-40be-4509-bc43-22b602d239fa.jpg' },
      image: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg',
      likes: 89,
      caption: 'Новые приключения ждут! ✈️ #travel #adventure',
      timeAgo: '5 часов назад'
    }
  ]

  const messages = [
    { id: 1, name: 'alex_photo', lastMessage: 'Отличные фото!', time: '10:30', unread: 2, avatar: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg' },
    { id: 2, name: 'maria_travel', lastMessage: 'Когда встречаемся?', time: '09:15', unread: 0, avatar: '/img/cb3ffae2-40be-4509-bc43-22b602d239fa.jpg' },
    { id: 3, name: 'design_daily', lastMessage: 'Классный дизайн!', time: 'Вчера', unread: 1, avatar: '/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-instagram-blue to-instagram-purple bg-clip-text text-transparent">
              Instagram
            </h1>
            <div className="flex items-center space-x-4">
              <Icon name="Heart" size={24} className="text-gray-700 hover:text-instagram-vibrant transition-colors cursor-pointer" />
              <Icon name="Send" size={24} className="text-gray-700 hover:text-instagram-blue transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pb-16">
          {activeTab === 'home' && (
            <div className="animate-fade-in">
              {/* Stories */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center min-w-[70px] cursor-pointer group">
                      <div className={`relative ${story.isOwn ? 'ring-2 ring-gray-300' : story.viewed ? 'ring-2 ring-gray-300' : 'ring-2 ring-gradient-to-r from-instagram-purple to-instagram-blue'} ring-offset-2 rounded-full p-0.5 transition-transform group-hover:scale-105`}>
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={story.image} alt={story.name} />
                          <AvatarFallback>{story.name[0]}</AvatarFallback>
                        </Avatar>
                        {story.isOwn && (
                          <div className="absolute -bottom-1 -right-1 bg-instagram-blue rounded-full p-1">
                            <Icon name="Plus" size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 mt-1 text-center truncate w-16">
                        {story.isOwn ? 'Ваша история' : story.name}
                      </span>
                      {story.isOwn && (
                        <Badge variant="secondary" className="text-xs mt-1 bg-gradient-to-r from-instagram-purple to-instagram-blue text-white">
                          {formatTime(timeRemaining)}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-none bg-white">
                    {/* Post Header */}
                    <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{post.user.name}</p>
                        <p className="text-xs text-gray-500">{post.timeAgo}</p>
                      </div>
                      <Icon name="MoreHorizontal" size={20} className="text-gray-600 cursor-pointer" />
                    </CardHeader>

                    {/* Post Image */}
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full aspect-square object-cover"
                      />
                    </div>

                    {/* Post Actions */}
                    <CardContent className="pt-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <Icon name="Heart" size={24} className="text-gray-700 hover:text-instagram-vibrant transition-colors cursor-pointer hover:scale-110" />
                          <Icon name="MessageCircle" size={24} className="text-gray-700 hover:text-instagram-blue transition-colors cursor-pointer" />
                          <Icon name="Send" size={24} className="text-gray-700 hover:text-instagram-blue transition-colors cursor-pointer" />
                        </div>
                        <Icon name="Bookmark" size={24} className="text-gray-700 hover:text-instagram-emerald transition-colors cursor-pointer" />
                      </div>
                      
                      <p className="font-semibold text-sm mb-1">{post.likes} отметок "Нравится"</p>
                      <p className="text-sm">
                        <span className="font-semibold">{post.user.name}</span> {post.caption}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="animate-fade-in px-4 pt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Сообщения</h2>
                <Icon name="Edit" size={24} className="text-instagram-blue cursor-pointer" />
              </div>
              
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.avatar} alt={message.name} />
                      <AvatarFallback>{message.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm">{message.name}</p>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                    </div>
                    {message.unread > 0 && (
                      <Badge className="bg-instagram-vibrant text-white text-xs px-2 py-1">
                        {message.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-instagram-blue' : 'text-gray-600'}`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs">Главная</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center space-y-1 ${activeTab === 'search' ? 'text-instagram-blue' : 'text-gray-600'}`}
            >
              <Icon name="Search" size={24} />
              <span className="text-xs">Поиск</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center space-y-1 text-gray-600"
            >
              <Icon name="PlusSquare" size={24} />
              <span className="text-xs">Создать</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center space-y-1 ${activeTab === 'messages' ? 'text-instagram-blue' : 'text-gray-600'} relative`}
            >
              <Icon name="MessageCircle" size={24} />
              <span className="text-xs">Сообщения</span>
              <Badge className="absolute -top-1 -right-1 bg-instagram-vibrant text-white text-xs px-1 py-0">
                3
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center space-y-1 text-gray-600"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src="/img/a3e61e48-1fbb-4276-8229-7ca1e018a973.jpg" alt="Profile" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <span className="text-xs">Профиль</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}