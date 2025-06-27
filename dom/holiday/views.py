from django.shortcuts import render
from django.http import JsonResponse
from .services import fetch_holiday
from .utils import get_country_from_ip
from django.utils.timezone import now
import datetime

#list of holidays
def holiday_list(request):
    year = now().year
    ip = request.META.get("REMOTE_ADDR", "")
    country = get_country_from_ip(ip)
    
    holiday= fetch_holiday(country, year)
    
    return JsonResponse({"holiday": holiday, "country": country, "year": year})

def holiday_view(request):
    year = now().year
    ip = request.META.get("REMOTE_ADDR", "")
    country = get_country_from_ip(ip)
    
    holidays= fetch_holiday(country, year)
    
    today = datetime.date.today()
    parsed = []
    
    for holiday in holidays:
        try:
            #convert date string to Python date object
            h_date = datetime.datetime.strptime(holiday["date"]["iso"], "%Y-%m-%d").date()
            holiday["date_obj"] = h_date
            parsed.append(holiday)
        except Exception as e:
            continue #skip it
        
    #sort by date
    parsed.sort(key=lambda x: x["date_obj"])
    
    today_holiday = next((x for x in parsed if x["date_obj"] == today), None)
    recent = None
    upcoming = None
    
    if not today_holiday:
        past = [x for x in parsed if x["date_obj"] < today]
        future = [x for x in parsed if x["date_obj"] > today]
        
        if past:
            recent = past[-1]
        if future:
            upcoming = future[0]
    else:
        future = [x for x in parsed if x["date_obj"] > today]
        if future:
            upcoming = future[0]
    
    return JsonResponse({
        "country":country,
        "year": year,
        "today_holiday": today_holiday,
        "recent_holiday": recent,
        "upcoming_holiday": upcoming,
    })