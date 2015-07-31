class MilestonesController < ApplicationController

  def create

    data = CSV.generate do |csv|
      csv << ["Subject", "Start Date", "Start Time", "End Date", "End Time", "All Day Event", "Description", "Location", "Private"]
      params[:milestones].each do |milestone|
        milestone = milestone.last
        if milestone['start_time'].present?
          start_time = Time.parse(milestone['start_time'])
        end
        if milestone['end_time'].present?
          end_time = Time.parse(milestone['end_time'])
        end
        csv << [milestone['name'], start_time.try(:strftime, '%Y/%M/%d'), start_time.try(:strftime, '%H:%M'), end_time.try(:strftime, '%Y/%M/%d'), end_time.try(:strftime, '%H:%M'), false, '', '', false]
      end
    end

    render json: {file: data}
  end

end