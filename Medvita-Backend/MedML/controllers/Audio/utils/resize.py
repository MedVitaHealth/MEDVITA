import numpy as np


def resize_mfcc(mfcc):
    X = [x for x in mfcc]
    X = np.array(X)
    X = X.reshape(1, 40, 1)

    return X
