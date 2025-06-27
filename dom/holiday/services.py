import requests

def fetch_holiday(country="VN", year=2025):
    url = "https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": "NgkvbtytMGTcY3Uog5x5324IKMKXvi7K",  # Replace this with your real key
        "country": country,
        "year": year,
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # raises error for 4xx/5xx responses

        return response.json().get("response", {}).get("holidays", [])

    except requests.exceptions.HTTPError as e:
        print("HTTP error:", e)
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
    except ValueError:
        print("Invalid JSON:", response.text)  # THIS is the likely cause

    return []  # fallback
