const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const newBranch = (angle, v1, v2) => {

    const rotateVector = (angle, x2, x1, y2, y1) => {
        const radians = degrees => degrees / 57.2958;
        angle = radians(angle);
        const x = x2 - x1;
        const y = y2 - y1;
        const rotatedX = Math.cos(angle) * x - Math.sin(angle) * y;
        const rotatedY = Math.sin(angle) * x + Math.cos(angle) * y;
        return [rotatedX + x1, rotatedY + y1]
    }

    const reduceMag = (vector, origin) => {
        const [x2, y2] = vector;
        const [x1, y1] = origin;
        return [(x2 - x1) / 1.5 + x1, (y2 - y1) / 1.5 + y1]
    }

    const translate = (vector, newOrigin) => {
        const [x1, y1] = vector;
        const [x2, y2] = newOrigin;
        return [x1 + x2, y1 + y2]
    }

    const subV = (vector2, vector1) => [vector2[0] - vector1[0], vector2[1] - vector1[1]]

    let v3 = rotateVector(angle, v2[0], v1[0], v2[1], v1[1]);
    v3 = reduceMag(v3, v1);
    return translate(v3, subV(v2, v1));
}

const drawLine = (v1, v2) => {
    ctx.beginPath();
    ctx.moveTo(...v1);
    ctx.lineTo(...v2);
    ctx.closePath();
    ctx.stroke();
};

const drawBranch = (depth, v1, v2) => {
    if (depth == 11) return
    drawLine(v1, v2);
    const leftBranch = newBranch(-30, v1, v2);
    const rightBranch = newBranch(30, v1, v2);
    drawBranch(depth + 1, v2, leftBranch)
    drawBranch(depth + 1, v2, rightBranch);
}

const v1 = [400, 800];
const v2 = [400, 600];
drawBranch(0, v1, v2);