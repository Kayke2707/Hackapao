<?php
include __DIR__ . "/../controller/fileController.php";

$fileController = new FileController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    switch ($_GET["acao"]) {
        case 'salvarImagem':
            $uploadDir = "../../public/uploads/";
            $tiposPermitidos = ["image/png","image/jpeg"];
            $image = $_FILES["image"];

            if(!is_dir($uploadDir)){
                mkdir($uploadDir,0777,true);
            }
            
            if(isset($image) && in_array($image["type"],$tiposPermitidos)){
                $caminhoTemp = $image["tmp_name"];
                $nomefoto = $image["name"];
                $extensao = pathinfo($nomefoto, PATHINFO_EXTENSION);
                $novoNome = uniqid("img_") . "." . $extensao;

                $destino = $uploadDir . $novoNome;

                if(move_uploaded_file($caminhoTemp,$destino)){
                    $resultado = $fileController->SalvarImagem($novoNome);
                    header("Location: ../../pages/foto/index.php");
                }
            }
            break;
        
        default:
            echo "Não achei";
            break;
    }
}


