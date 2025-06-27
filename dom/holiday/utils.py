import requests

#detect user's country
def get_country_from_ip(ip):
    try: 
        response = requests.get(f"https://ipapi.co/{ip}/json/")
        data = response.json()
        return data.get("country_code", 'VN')
    except:
        return 'VN'
        