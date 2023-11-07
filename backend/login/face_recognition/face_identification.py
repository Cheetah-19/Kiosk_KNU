from deepface.commons import distance as dst


def identification(target_embedding_img, db_embedding_img):
    if target_embedding_img is not None:
        return dst.findCosineDistance(target_embedding_img, db_embedding_img)
    else:
        return None
