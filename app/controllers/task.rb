get '/tasks' do
  @list = Task.all
  erb :'/tasks/index'
end

post '/tasks' do
  task = Task.create(name: params[:task_name])
  if request.xhr?
    task.name
    erb :'tasks/_task', :layout => false, :locals => {:task_name => task.name, :task_id => task.id}
  else
    redirect '/tasks'
  end
end

get '/tasks/new' do
  if request.xhr?
    erb :'/tasks/_form', :layout => false
  else
    erb :'/tasks/_form'
  end
end

delete '/tasks' do
  p params
  task = Task.find(params[:task_id])
  task.destroy
  if request.xhr?
    params[:task_id].to_s
  else
    redirect '/tasks'
  end
end
