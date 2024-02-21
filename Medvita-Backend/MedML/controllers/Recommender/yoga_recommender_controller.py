from controllers.Recommender.utils.magic import magic
import os


# recommend yoga poses
async def recommend_yoga_pose(first: str, second: str):
    recommendation = await magic(first, second)
    if len(recommendation) == 0:
        return "Recommendation Failed as no recommendation was made."
    
    # saving the recommendation list to a file
    try:
        with open('controllers/Recommender/recommendation.txt', 'w') as f:
            for item in recommendation:
                f.write("%s\n" % item)
    except:
        return "Recommendation Failed as the recommendation could not be saved."

    return {
            "message": "Recommendation Successful",
            "recommendation": recommendation
        }



# get the yoga poses
async def get_recommendations():
    try:
        with open('controllers/Recommender/recommendation.txt', 'r') as f:
            recommendation = f.readlines()
            # saving the recommendation in a list
            recommendation = [x.strip() for x in recommendation]
    except:
        return "Recommendation Failed"
    
    # delete the file
    try:
        os.remove('controllers/Recommender/recommendation.txt')
    except:
        return "Recommendation Failed"
    
    if not recommendation or len(recommendation) == 0:
        return "Recommendation Failed"

    return recommendation